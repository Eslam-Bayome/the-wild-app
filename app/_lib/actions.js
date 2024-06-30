"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

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

export async function createReservation(reservationData, formData) {
  const session = await auth();
  if (!session) {
    throw new Error("You Must Be Logged In");
  }
  const newReservation = {
    ...reservationData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: reservationData.cabinPrice,
    status: "unconfirmed",
    isPaid: false,
    hasBreakfast: false,
  };

  const { error } = await supabase.from("bookings").insert([newReservation]);

  if (error) throw new Error("Booking could not be created");
  revalidatePath(`/cabins/${reservationData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteReservation(bookingID) {
  // await new Promise((res) => setTimeout(res, 3000));
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

export async function updateReservation(formData) {
  const id = formData.get("id");
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000);

  //* 1) Authenication
  const session = await auth();

  if (!session) {
    throw new Error("You Must Be Logged In");
  }
  //* 2) Autherization

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsId = guestBookings.map((book) => book.id);

  if (!guestBookingsId.includes(+id)) {
    throw new Error("You Are Not Allowed to Update This Booking");
  }
  //* 3) Mutation

  const { data, error } = await supabase
    .from("bookings")
    .update({ numGuests, observations })
    .eq("id", id)
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  //* 4) Revalidation

  revalidatePath(`/account/reservations/edit/${id}`);

  //* 5) Redirect

  redirect("/account/reservations");
}
