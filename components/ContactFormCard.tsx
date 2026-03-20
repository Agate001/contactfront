"use client";

type Props = {
  formData: {
    name: string;
    contactEmail: string;
    number: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      contactEmail: string;
      number: string;
    }>
  >;
  onAdd: () => void;
  isEditing?: boolean;
  onCancel?: () => void;
};

export default function ContactFormCard({
  formData,
  setFormData,
  onAdd,
  isEditing = false,
  onCancel,
}: Props) {
  return (
    <section className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-2xl font-semibold text-gray-800">
        {isEditing ? "Edit Contact" : "Add New Contact"}
      </h2>

      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-indigo-400"
            placeholder="Enter contact name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            value={formData.contactEmail}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                contactEmail: e.target.value,
              }))
            }
            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-indigo-400"
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Phone
          </label>
          <input
            type="text"
            value={formData.number}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, number: e.target.value }))
            }
            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-indigo-400"
            placeholder="Enter phone number"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onAdd}
            className="flex-1 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-600"
          >
            {isEditing ? "Save Changes" : "Add Contact"}
          </button>

          {isEditing && onCancel && (
            <button
              onClick={onCancel}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </section>
  );
}