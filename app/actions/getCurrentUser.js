import dbConnect from "../lib/mongo";
import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    await dbConnect();
    const session = await getSession();

    if (!session?.user?.email) {
      console.log("No session found or user email missing");
      return null;
    }

    const currentUser = await User.findOne({
      email: session.user.email,
    }).lean();

    if (!currentUser) {
      console.log("No user found with email:", session.user.email);
      return null;
    }

    return { ...currentUser, _id: currentUser._id.toString() };
  } catch (err) {
    console.error("Error in getCurrentUser:", err);
    return null;
  }
};

export default getCurrentUser;
