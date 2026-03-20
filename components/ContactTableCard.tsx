// components/ContactTableCard.tsx
"use client";

import { Contact } from "@/interfaces/interface";

type Props = {
  contacts: Contact[];
  onDelete: (id: number) => void;
  onEdit: (contact: Contact) => void;
};

export default function ContactsTableCard({
  contacts,
  onDelete,
  onEdit,
}: Props) {
  return (
    <section className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-sm border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <h2 className="text-[1.7rem] font-semibold text-gray-800">
          All Contacts
        </h2>

        <span className="text-sm text-gray-500">
          {contacts.length} contact{contacts.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-4 border-b border-gray-200 px-5 py-3 text-sm font-semibold text-gray-500">
        <span>Name</span>
        <span>Email</span>
        <span>Phone</span>
        <span className="text-right">Actions</span>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        {contacts.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-gray-500">
            No contacts found.
          </div>
        ) : (
          <div className="flex flex-col">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="grid grid-cols-4 items-center border-b border-gray-100 px-5 py-4 last:border-b-0"
              >
                <span className="text-gray-800">{contact.name}</span>

                <span className="break-all text-gray-700">
                  {contact.contactEmail}
                </span>

                <span className="text-gray-700">{contact.number}</span>

                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => onEdit(contact)}
                    className="text-indigo-400 transition hover:text-indigo-500"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => onDelete(contact.id)}
                    className="h-6 w-6 rounded bg-red-500 transition hover:bg-red-600"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}