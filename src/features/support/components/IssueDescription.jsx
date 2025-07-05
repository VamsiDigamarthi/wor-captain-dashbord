import { File } from "lucide-react";
import React from "react";

export default function IssueDescription({
  description,
  attachments,
  openAttachment,
}) {
  return (
    <div className="p-2 rounded-2xl bg-white shadow-2xl w-full flex flex-col gap-2">
      <h2 className="font-bold text-2xl">Issue Description</h2>
      <p className="text-gray-600">{description}</p>

      <p className="text-gray-600">Attachments</p>

      <div className="grid grid-cols-4 gap-2">
        {attachments?.map((e) => {
          return (
            <button
              className="bg-gray-300 rounded-lg flex items-center justify-center flex-col  font-semibold px-4 py-2 cursor-pointer"
              onClick={() => openAttachment(e)}
            >
              <File />
              {e.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
