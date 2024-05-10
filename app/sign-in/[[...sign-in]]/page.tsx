// https://telegraph-image-bak.pages.dev/file/090e5eb2039cad1df3bab.jpg 6144x3456

import { SignIn } from "@clerk/nextjs";

const AuthPage = () => {
  return (
    <div className="size-full bg-[url('https://telegraph-image-bak.pages.dev/file/54a1291a304be38546804.jpg')] bg-cover flex items-center justify-center drop-shadow-md">
      {/* <div className="backdrop-blur-sm bg-white/10 p-8 rounded-md flex flex-col gap-y-8"> */}
      <SignIn path="/sign-in" />
      {/* </div> */}
    </div>
  );
};

export default AuthPage;
