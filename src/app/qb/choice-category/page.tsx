"use client";
import React, { useEffect, useState } from "react";
import { NestedCheckbox } from "@/components/custom/choiceCategory";

const subjectData: Record<string, unknown> = {
  Science: {
    Physics: {
      "Quantum Mechanics": {
        "Quantum Field Theory": false,
        "String Theory": false,
      },
      "Classical Mechanics": false,
    },
    Chemistry: {
      "Organic Chemistry": false,
      "Inorganic Chemistry": false,
    },
    Biology: false,
  },
  Math: {
    Algebra: false,
    Geometry: false,
    Calculus: false,
  },
  Humanities: {
    History: {
      "World History": false,
      "American History": false,
    },
    Literature: false,
    Philosophy: false,
  },
};

export default function Categories() {
  const [selected, setSelected] = useState<string[]>();
  useEffect(() => {
    function log() {
      console.log(selected?.length);
    }
    log();
  }, [selected]);
  return (
    <div className="m-3 p-4 border-2 border-gray-300 rounded-md">
      <h1 className="text-center my-6">Categorias</h1>

      <p className="text-gray-600 text-nowrap my-5">
        Seleciona as categorias que desejas aprender.
      </p>
      <NestedCheckbox data={subjectData} setSelected={setSelected} />
    </div>
  );
}
