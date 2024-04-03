import { RESULT_PER_PAGE } from "../utils/constants";
import supabase from "./supabase";

export async function getGuests({ page, sortBy }) {
  let query = supabase.from("guests").select("*", { count: "exact" });
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (page) {
    const from = RESULT_PER_PAGE * (page - 1);
    const to = from + RESULT_PER_PAGE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Get error when trying to fetch Cabins");
  }
  return { data, count };
}

export async function deleteGuest(guestID) {
  const { data, error } = await supabase
    .from("guests")
    .delete()
    .eq("id", guestID);
  if (error) {
    console.error(error);
    throw new Error("Get error when trying to delete a Guest");
  }
  return data;
}

export async function createGuest(newGuest) {
  const { data, error } = await supabase
    .from("guests")
    .insert([{ ...newGuest }])
    .select();
  if (error) throw new Error("Guest could not be created");

  return data;
}
export async function editGuest(newGuestData, id) {
  const { data, error } = await supabase
    .from("guests")
    .update(newGuestData)
    .eq("id", id)
    .select();
  console.log(data);

  if (error) throw new Error("Guest could not be Edited");

  return data;
}
