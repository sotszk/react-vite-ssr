import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event, _context) => {
  console.log("url:", event.rawUrl);
  return {
    statusCode: 200,
    body: "Hello, world",
  };
};
