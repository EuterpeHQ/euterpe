export default function page() {
  return (
    <div className=" max-w-screen-2xl m-auto max-h-screen">
      <header className="flex justify-center mb-0 flex-wrap gap-2 mt-16">
        <img className=" size-10" src="./logo/logo.png" alt="logo" />
        <h2 className="text-4xl font-bold text-white mb-0 text-center">
          Euterpe
        </h2>
      </header>
      <main className="m-auto w-full flex flex-col mt-20">
        <div className="flex flex-col flex-wrap justify-center items-center space-y-3">
          <h3 className="font-bold text-xl">Create an Account</h3>
          <p className="mb-2">
            Already have an account?{" "}
            <span className="text-primary"> Log in</span>
          </p>
        </div>
        <form className="mt-4 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[30%] mx-auto space-y-6">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  shadow-sm-light"
              placeholder="name@euterpe.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              className="shadow-sm text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  shadow-sm-light"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-black bg-white hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Create account
          </button>
          <div className="flex justify-center items-center my-2">
            <div className="border-t border-gray-400 w-full"></div>
            <div className="mx-4 text-gray-400">or</div>
            <div className="border-t border-gray-400 w-full"></div>
          </div>
          <button
            type="submit"
            className="w-full text-black bg-primary hover:bg-lime-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Connect Wallet
          </button>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                value=""
                className="w-4 h-4 border  focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 border-gray-600 ring-offset-gray-800 focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="terms"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{" "}
              <a href="#" className="text-gray-400 hover:underline">
                terms and conditions
              </a>
            </label>
          </div>
        </form>
      </main>
    </div>
  );
}
