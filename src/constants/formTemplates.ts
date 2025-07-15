// formTemplates.ts

export type FieldType = {
    id?: string; // Optional ID for the field
  type:
    | "text"
    | "email"
    | "textarea"
    | "number"
    | "date"
    | "select"
    | "checkbox"
    | "tel";
  label: string;
  layout?: "single" | "firstLast" | "firstMiddleLast";
  placeholder: string;
  selectOptions?: string[];
  style?: {
    wrapper?: string;
    label?: string;
    input?: string;
    
  };
};

export type TemplateType = {
  id: number;
  active?: boolean;
  title: string;
  wrapper?: string;
  fields: FieldType[];
  custom?: {
      [key: string]: string;
    };
  submitButton: {
    label: string;
    redirectUrl?: string;
    style: string;
    wrapper?: string;
    alignment?: "left" | "center" | "right";
  };
};

export const formTemplates: TemplateType[] = [
  {
    id: 1,
    title: "Contact Form",
    fields: [
      {
        id: '1',
        type: "text",
        label: "Name",
        placeholder: "Enter your name",
        style: {
          wrapper: "mb-4",
          label: "block text-sm font-medium text-gray-700",
          input:
            "mt-1 border border-gray-300 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500",
        },
      },
      {
        id: '2',
        type: "email",
        label: "Email",
        placeholder: "Enter your email",
        style: {
          wrapper: "mb-4",
          label: "block text-sm font-medium text-gray-700",
          input:
            "mt-1 border border-gray-300 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500",
        },
      },
      {
        id: '3',
        type: "textarea",
        label: "Message",
        placeholder: "Write your message",
        style: {
          wrapper: "mb-4",
          label: "block text-sm font-medium text-gray-700",
          input:
            "mt-1 border border-gray-300 rounded-md p-2 w-full resize-none h-28 focus:ring-blue-500 focus:border-blue-500",
        },
      },
    ],
    submitButton: {
      label: "Send Message",
      wrapper: "mt-6",
      style:
        "w-full bg-black hover:bg-black text-white font-medium py-2 px-4 rounded-md transition",
    },
  },
  {
    id: 2,
    title: "Feedback Form",
    fields: [
      {
        id: '1',
        type: "text",
        label: "Name",
        placeholder: "Optional",
        style: {
          wrapper: "mb-3",
          label: "block text-sm text-gray-600",
          input:
            "mt-1 border border-gray-200 rounded p-2 w-full bg-gray-50 focus:ring-green-500",
        },
      },
      {
        id: '2',
        type: "textarea",
        label: "Your Feedback",
        placeholder: "We value your feedback",
        style: {
          wrapper: "mb-3",
          label: "block text-sm text-gray-600",
          input:
            "mt-1 border border-gray-300 rounded p-2 w-full h-24 bg-gray-50 focus:ring-green-500",
        },
      },
    ],
    submitButton: {
      label: "Submit Feedback",
      wrapper: "mt-4",
      alignment: "right",
      style:
        " bg-black hover:bg-black text-white font-medium py-2 px-4 rounded-md transition",
    },
  },
  {
    id: 3,
    title: "Event Registration",
    fields: [
      {
        id: '1',
        type: "text",
        label: "Full Name",
        placeholder: "John Doe",
        style: {
          wrapper: "mb-4",
          label: "block text-base font-semibold text-gray-800",
          input: "mt-1 border rounded-md p-3 w-full focus:border-indigo-600",
        },
      },
      {
        id: '2',
        type: "email",
        label: "Email",
        placeholder: "johndoe@email.com",
        style: {
          wrapper: "mb-4",
          label: "block text-base font-semibold text-gray-800",
          input: "mt-1 border rounded-md p-3 w-full focus:border-indigo-600",
        },
      },
      {
        id: '3',
        type: "number",
        label: "Tickets",
        placeholder: "Number of tickets",
        style: {
          wrapper: "mb-4",
          label: "block text-base font-semibold text-gray-800",
          input: "mt-1 border rounded-md p-3 w-full focus:border-indigo-600",
        },
      },
    ],
    submitButton: {
      label: "Register Now",
      wrapper: "mt-6",
      style:
        "w-full bg-black hover:bg-black text-white font-semibold py-2 px-4 rounded-md transition",
    },
  },
  {
    id: 4,
    title: "Job Application",
    fields: [
      {
        id: '1',
        type: "text",
        label: "Full Name",
        placeholder: "Your full name",
        style: {
          wrapper: "mb-3",
          label: "block text-sm text-gray-700",
          input:
            "mt-1 border border-gray-300 rounded p-2 w-full focus:ring-purple-500",
        },
      },
      {
        id: '2',
        type: "email",
        label: "Email",
        placeholder: "Your email",
        style: {
          wrapper: "mb-3",
          label: "block text-sm text-gray-700",
          input:
            "mt-1 border border-gray-300 rounded p-2 w-full focus:ring-purple-500",
        },
      },
      {
        id: '3',
        type: "textarea",
        label: "Why should we hire you?",
        placeholder: "Describe in brief",
        style: {
          wrapper: "mb-3",
          label: "block text-sm text-gray-700",
          input:
            "mt-1 border border-gray-300 rounded p-2 w-full h-24 resize-none focus:ring-purple-500",
        },
      },
    ],
    submitButton: {
      label: "Apply Now",
      wrapper: "mt-5",
      style:
        "w-full bg-black hover:bg-black text-white font-medium py-2 px-4 rounded-md transition",
    },
  },
  {
    id: 5,
    title: "Newsletter Signup",
    fields: [
      {
        id: '1',
        type: "email",
        label: "Email Address",
        placeholder: "Enter your email",
        style: {
          wrapper: "mb-3",
          label: "block text-sm font-medium",
          input:
            "mt-1 border border-gray-300 rounded p-2 w-full bg-white focus:ring-blue-400",
        },
      },
    ],
    submitButton: {
      label: "Subscribe",
      wrapper: "mt-4",
      style:
        "w-full bg-black hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-md transition",
    },
  },
];
