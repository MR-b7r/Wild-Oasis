import supabase, {
  supabaseSignup,
  supabaseUpdateAvatar,
  supabaseUrl,
} from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabaseSignup.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  //1. Update password OR fullname
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //2. upload avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(fileName, avatar, { upsert: true });
  if (storageError) throw new Error(storageError.message);

  //3. Update avatar in user interface
  const { data: updateUser, error: errorUser } = await supabase.auth.updateUser(
    {
      data: {
        avatar: `${supabaseUrl}/${supabaseUpdateAvatar}/${fileName}`,
      },
    }
  );
  if (errorUser) throw new Error(errorUser.message);

  return updateUser;
}

export async function forgotPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) throw new Error(error.message);
}

export async function changePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw new Error(error.message);
}
