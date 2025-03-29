import React, { ChangeEvent, useState } from "react";
import { useAtom, atom } from "jotai";
import { countAtom } from "../store/context";
import { Link } from "react-router-dom";
import { Component } from "iconsax-react";
import { z } from "zod";

interface Errors {
  name: string;
  email: string;
  age?: string;
}

function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const initErrors: Errors = {
    name: "",
    email: "",
    age: "",
  };
  const [errors, setErrors] = useState<Errors>(initErrors);

  const createSchema = () => {
    const baseSchema = z.object({
      name: z.string().min(2, "Name must be at least 2 characters."),
      email: z.string().email("Invalid email format."),
    });
    if (selectedRole === "Support") {
      return baseSchema.extend({
        age: z
          .number()
          .int("Age must be an integer")
          .positive("Age must be a positive number")
          .min(18, "Age must be at least 18"),
      });
    }
    return baseSchema;
  };

  const handleSave = () => {
    const schema = createSchema();
    const result = schema.safeParse({ name, email, age });
    const errorObject: Errors = { ...initErrors };

    if (result.success) {
      setErrors(initErrors);
    } else {
      if (result.error && result.error.issues) {
        result.error.issues.forEach((error) => {
          const field = error.path[0] as keyof Errors;
          if (errorObject.hasOwnProperty(field)) {
            errorObject[field] = error.message;
          }
        });
      }
      // if (result.error && result.error.issues) {
      //   for (let i = 0; i < result.error.issues.length; i++) {
      //     const error = result.error.issues[i];
      //     if (error.path[0] === "name" || error.path[0] === "email") {
      //       errorObject[error.path[0]] = error.message;
      //     }
      //   }
      // }
      setErrors(errorObject);
    }
  };

  const [selectedRole, setSelectedRole] = useState("");
  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

  const [age, setAge] = useState<number | null>(null);
  const handleAge = (e: ChangeEvent<HTMLInputElement>) =>
    setAge(parseInt(e.target.value, 10));

  return (
    <div className="  flex flex-col gap-4  max-w-[350px] mx-auto py-6">
      <div className="flex flex-col gap-1">
        <label>Name</label>
        <input
          type="text"
          className="p-2 bg-slate-300 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span>{errors?.name}</span>
      </div>
      <div className="flex flex-col gap-1">
        <label>Email</label>
        <input
          type="text"
          className="p-2 bg-slate-300 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>{errors?.email}</span>
      </div>
      <select onChange={handleRoleChange} value={selectedRole}>
        <option value="" disabled>
          Select a role
        </option>
        {["Admin", "Support", "Salesman"].map((role) => {
          return (
            <option key={role} value={role}>
              {role}
            </option>
          );
        })}
      </select>

      {selectedRole === "Support" && (
        <div className="flex flex-col gap-1">
          <label>Age</label>
          <input
            type="number"
            className="p-2 bg-slate-300 rounded-md"
            value={age === null ? "" : age.toString()}
            onChange={handleAge}
          />
          <span>{errors?.age}</span>
        </div>
      )}

      <button
        onClick={handleSave}
        className="bg-slate-900 text-white rounded-md p-1"
      >
        Save
      </button>
      <p>{JSON.stringify(errors)}</p>
    </div>
  );
}

export default Home;
