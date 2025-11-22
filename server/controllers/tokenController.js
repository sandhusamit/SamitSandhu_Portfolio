import Token from "../models/token.model.js";

// 1️⃣ Get token by tokenString
export const getTokenByString = async (req, res) => {
  try {
    const { tokenString } = req.params;
    const token = await Token.findOne({ tokenString });

    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const isTokenValid = async (tokenString) => {
    const token = await Token.findOne({ tokenString });
    if (!token) return { valid: false, reason: "Token not found" };
  
    const now = new Date();
  
    if (token.status !== "active") return { valid: false, reason: "Token revoked" };
    if (token.expiresOn <= now) return { valid: false, reason: "Token expired" };
  
    return { valid: true };
  };
  

// 3️⃣ Change token status (e.g., active → revoked)
export const updateTokenStatus = async (tokenString, newStatus) => {
    try {
      const token = await Token.findOneAndUpdate(
        { tokenString },
        { status: newStatus },
        { new: true }
      );
  
      if (!token) {
       throw Error("Token not found");
      }
  
      return token;
    } catch (error) {
      throw error;
    }
  };
  

// 4️⃣ Delete token by tokenString
export const deleteTokenByString = async (req, res) => {
  try {
    const { tokenString } = req.params;
    const deleted = await Token.findOneAndDelete({ tokenString });

    if (!deleted) {
      return res.status(404).json({ message: "Token not found" });
    }

    res.status(200).json({ message: "Token deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5️⃣ Add token to DB
export const addToken = async (tokenData) => {
  try {
    const { userID, tokenString, status, createdOn, expiresOn } = tokenData;
    const newToken = new Token({
      userId: "68f6cbb41dd0e5ba21143cc2",  //hardcode for now..
      tokenString,
      status,
      createdOn,
      expiresOn,
    }
    );
    const savedToken = await newToken.save();
  } catch (error) {
    throw error;
  }
};
