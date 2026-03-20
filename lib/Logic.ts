import { Contact, Token, UserInfo } from "@/interfaces/interface";

const loginUrl =
  "https://contactmanagercl-ctdggcfqdpfeh4dw.westus3-01.azurewebsites.net/Login/";

const contactUrl =
  "https://contactmanagercl-ctdggcfqdpfeh4dw.westus3-01.azurewebsites.net/Contact/";

// ---------------- AUTH ----------------

export const createAccount = async (user: UserInfo) => {
  const res = await fetch(loginUrl + "CreateUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const data = await res.json();
    console.log(data.message);
    return data.success ?? false;
  }

  const data = await res.json();
  return data.success;
};

export const login = async (user: UserInfo) => {
  const res = await fetch(loginUrl + "Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const data = await res.json();
    console.log(data.message);
    return null;
  }

  const data: Token = await res.json();
  return data;
};

// ---------------- CONTACTS ----------------

export const getContacts = async (token: string): Promise<Contact[]> => {
  const res = await fetch(contactUrl + "GetContacts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    const data = await res.json();
    console.log(data.message);
    return [];
  }

  const data: Contact[] = await res.json();
  return data;
};

export const getContactById = async (id: number, token: string) => {
  const res = await fetch(contactUrl + "GetContactById/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    const data = await res.json();
    console.log(data.message);
    return null;
  }

  const data = await res.json();
  return data;
};

export const getContactByName = async (name: string, token: string) => {
  const res = await fetch(contactUrl + "GetContactByName/" + name, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    const data = await res.json();
    console.log(data.message);
    return [];
  }

  const data = await res.json();
  return data;
};

export const addContact = async (
  contact: {
    name: string;
    contactEmail: string;
    number: string;
  },
  token: string
) => {
  const res = await fetch(contactUrl + "AddContact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(contact),
  });

  if (!res.ok) {
    const data = await res.json();
    console.log(data.message);
    return false;
  }

  const data = await res.json();
  return data;
};

export const editContact = async (
  contact: {
    id: number;
    name: string;
    contactEmail: string;
    number: string;
  },
  token: string
) => {
  const res = await fetch(contactUrl + "EditContact", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(contact),
  });

  if (!res.ok) {
    const data = await res.json();
    console.log(data.message);
    return false;
  }

  const data = await res.json();
  return data;
};

export const deleteContactSoYouDontSeeThatGirlYouCutOffAtTheClub = async (id: number, token: string) => {
  const res = await fetch(contactUrl + "DeleteContact/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    const data = await res.json();
    console.log(data.message);
    return false;
  }

  const data = await res.json();
  return data;
};

// ---------------- LOCAL STORAGE ----------------

export const checkToken = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const getToken = () => localStorage.getItem("token") ?? "";

export const loggedInData = () =>
  JSON.parse(localStorage.getItem("user") || "null");

export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const saveUser = (user: Contact | UserInfo) => {
  localStorage.setItem("user", JSON.stringify(user));
};