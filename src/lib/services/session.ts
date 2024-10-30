import getConfig from "next/config";
import { cookies } from "next/headers";

interface Category {
  id: number;
  name: string;
  parentId?: number | null;
  children?: Category[];
}

export async function callGetCategories() {
  const { serverRuntimeConfig } = getConfig();
  const token = cookies()?.get("token")?.value;

  if (!token) {
    return {
      error: "Token inválido",
    };
  }

  const response = await fetch(
    `${serverRuntimeConfig.URL}/api/session/categories`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const result = await response.json();

  if (result.error) {
    return result;
  }

  const buildSubjectData = (
    categories: Category[]
  ): Record<string, unknown> => {
    const buildNestedStructure = (
      categoryList: Category[]
    ): Record<string, unknown> => {
      return categoryList.reduce((acc, category) => {
        if (category.children && category.children.length > 0) {
          acc[category.name] = buildNestedStructure(category.children);
        } else {
          acc[category.name] = false;
        }
        return acc;
      }, {} as Record<string, unknown>);
    };

    return buildNestedStructure(categories);
  };

  return buildSubjectData(result.result);
}
