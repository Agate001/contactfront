// app/home/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ContactFormCard from "@/components/ContactFormCard";
import ContactsTableCard from "@/components/ContactTableCard";
import { Contact } from "@/interfaces/interface";
import {
  addContact,
  deleteContactSoYouDontSeeThatGirlYouCutOffAtTheClub,
  editContact,
  getContacts,
  getToken,
} from "@/lib/Logic";

export default function Page() {
  const router = useRouter();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contactEmail: "",
    number: "",
  });

  const loadContacts = async () => {
    const token = getToken();

    if (!token) {
      router.push("/");
      return;
    }

    const data = await getContacts(token);
    setContacts(data);
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/");
      return;
    }

    setCheckedAuth(true);
    loadContacts();
  }, [router]);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      `${contact.name} ${contact.contactEmail} ${contact.number}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [contacts, search]);

  const resetForm = () => {
    setFormData({
      name: "",
      contactEmail: "",
      number: "",
    });
    setEditingId(null);
  };

  const handleSaveContact = async () => {
    if (!formData.name || !formData.contactEmail || !formData.number) return;

    const token = getToken();
    if (!token) {
      router.push("/");
      return;
    }

    if (editingId !== null) {
      const updatedContact: Contact = {
        id: editingId,
        name: formData.name,
        contactEmail: formData.contactEmail,
        number: formData.number,
      };

      const result = await editContact(updatedContact, token);

      if (result) {
        setContacts((prev) =>
          prev.map((contact) =>
            contact.id === editingId ? updatedContact : contact,
          ),
        );
        resetForm();
      }

      return;
    }

    const newContact = {
      name: formData.name,
      contactEmail: formData.contactEmail,
      number: formData.number,
    };

    const result = await addContact(newContact, token);

    if (result) {
      await loadContacts();
      resetForm();
    }
  };

  const handleDelete = async (id: number) => {
    const token = getToken();
    if (!token) {
      router.push("/");
      return;
    }

    const result = await deleteContactSoYouDontSeeThatGirlYouCutOffAtTheClub(
      id,
      token,
    );

    if (result) {
      setContacts((prev) => prev.filter((contact) => contact.id !== id));

      if (editingId === id) {
        resetForm();
      }
    }
  };

  const handleEdit = (contact: Contact) => {
    setEditingId(contact.id);
    setFormData({
      name: contact.name,
      contactEmail: contact.contactEmail,
      number: contact.number,
    });
  };

  if (!checkedAuth) return null;

  return (
    <main className="text-black dark:text-black h-screen w-full overflow-hidden bg-[#f5f5f7]">
      <div className="flex h-full w-full flex-col">
        <header className="flex w-full items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold text-white">
              CF
            </div>

            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-indigo-500">
                ContactFlow
              </span>
              <h1 className="text-[1.7rem] font-semibold text-gray-800">
                Contact Manager
              </h1>
            </div>
          </div>

          <div className="relative w-70">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-indigo-400"
            />
          </div>
        </header>

        <section className="flex-1 max-h-100 min-h-0 p-5">
          <div className="grid h-full min-h-0 grid-cols-1 gap-5 lg:grid-cols-[400px_1fr]">
            <ContactFormCard
              formData={formData}
              setFormData={setFormData}
              onAdd={handleSaveContact}
              isEditing={editingId !== null}
              onCancel={resetForm}
            />

            <ContactsTableCard
              contacts={filteredContacts}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        </section>
      </div>
    </main>
  );
}