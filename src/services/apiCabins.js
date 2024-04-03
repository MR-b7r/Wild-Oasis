import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Get error when trying to fetch Cabins");
  }
  return data;
}

// https://cttmzzphorfhqkzyboaj.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Create/Edit cabin
  let query = supabase.from("cabins");

  // A) Create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // B) Edit
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Get error when trying to create Cabins");
  }

  // upload image
  if (hasImagePath) return data;

  const { storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  console.log(newCabin);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("cabin image could not be uploaded, Try again");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Get error when trying to delete a Cabin");
  }
  return data;
}
