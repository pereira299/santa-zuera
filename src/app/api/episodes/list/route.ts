import { NextRequest, NextResponse } from "next/server";
import contentful from "@/services/contentful";
import { Entry } from "contentful";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams;
  const page = Number(search.get("page") || 1);
  const qtd = Number(search.get("qtd") || 20);

  const res = await contentful.getEntries({
    content_type: "episode",
    select: [
      "fields.title",
      "fields.thumbnail",
      "fields.publishDate",
      "fields.categories",
      "fields.participantes",
      "fields.countNumber",
    ],
    limit: qtd,
    skip: (page - 1) * qtd,
    order: ["-fields.publishDate"],
  });

  const sanitized = res.items.map((item) => {
    const categories = (item.fields.categories as Array<Entry>)?.map((c) => ({
      id: c.sys.id,
      name: c.fields.name,
    }));

    const participantes = (item.fields.participantes as Array<Entry>)?.map(
      (p) => {
        let url = "";
        if (p.fields.instagram)
          url =
            "https:" +
            (p.fields.instagram as { fields: { file: { url: string } } }).fields
              .file.url;
        else
          url = `https://avatar.iran.liara.run/username?username=${p.fields.name}`;

        return {
          id: p.sys.id,
          name: p.fields.name,
          photoUrl: url,
        };
      }
    );

    return {
      ...item.fields,
      id: item.sys.id,
      categories,
      participantes,
    };
  });
  return NextResponse.json(sanitized);
}
