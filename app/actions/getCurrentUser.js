import User from "../lib/models/User";
import dbConnect from "../lib/mongo";
import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    await dbConnect();
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await User.findOne({
      email: session.user.email,
    }).lean();

    if (!currentUser) {
      return null;
    }

    return { ...currentUser, _id: currentUser._id.toString() };
  } catch (err) {
    return null;
  }
};

export default getCurrentUser;
