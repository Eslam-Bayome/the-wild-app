"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfileAction(formData) {
  const session = await auth();
  if (!session) {
    throw new Error("You Must Be Logged In");
  }
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please Provide a Valid Nantonal ID");
  }
  if (!nationality) throw new Error("Please Enter A Country");
  const updateDate = {
    nationality,
    countryFlag,
    nationalID,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updateDate)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingID) {
  const session = await auth();
  if (!session) {
    throw new Error("You Must Be Logged In");
  }
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsId = guestBookings.map((book) => book.id);
  if (!guestBookingsId.includes(bookingID)) {
    throw new Error("You Are Not Allowed to Delete This Booking");
  }
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingID);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}
