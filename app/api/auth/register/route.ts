import { createRegisterUser } from "@/actions/user";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    console.log(email, password);

    const user = await createRegisterUser({ email, password });

    const response = {
      code: 201,
      message: "success register user",
      data: { user },
    };

    return Response.json(response);
  } catch (error) {
    console.log(error);
  }
}
