import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { RESULT_PER_PAGE } from "../utils/constants";

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "created_at, startDate, endDate, id, numGuests, numNights, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );
  // FILTER
  if (filter) {
    query = query[filter.mehod || "eq"](filter.field, filter.value);
  }
  // SORT
  if (sortBy) {
    query = query.order(sortBy.sortField, {
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

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extraPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function createBooking(newBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([{ ...newBooking }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  // console.log(data);
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(id, obj);
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
