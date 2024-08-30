import * as contentful from "contentful";
import * as cma from "contentful-management";

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || "",
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
});

const cmaClient = cma.createClient({
  accessToken: process.env.CONTENTFUL_CMA_TOKEN || "",
});
const createEntry = async (contentType: string, data: any) => {
  const space = await cmaClient.getSpace(process.env.CONTENTFUL_SPACE_ID || "");
  const environment = await space.getEnvironment(
    process.env.CONTENTFUL_ENVIRONMENT || "master"
  );
  const entry = await environment.createEntry(contentType, {
    fields: data,
  });
  await entry.publish();
  return entry;
};


const contentfulModule = {
  createEntry,
  ...client,
};

export default contentfulModule;
