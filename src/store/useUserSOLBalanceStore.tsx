import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { create } from "zustand";

interface UserSOLBalance {
    balance: number;
    getUserSOLBalance: (publicKey: PublicKey, connection: Connection)=> void;
}


const useUserSOLBalance = create<UserSOLBalance>((set, _get)=>({
    balance: 0,
    getUserSOLBalance: async (publicKey, connection )=>{
        let balance = 0;

        try {
            balance = await connection.getBalance(publicKey, "confirmed");
            balance = balance / LAMPORTS_PER_SOL;
        } catch (error) {
            console.log(error)
        }

        set((state) => ({
            ...state,
            balance: balance,
        }));
        console.log("Balanace: ", balance)

    },

}));

export default useUserSOLBalance;
