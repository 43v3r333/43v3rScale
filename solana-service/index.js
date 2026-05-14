const express = require('express');
const { Connection, PublicKey, Keypair, Transaction, sendAndConfirmTransaction } = require('@solana/web3.js');
const { getOrCreateAssociatedTokenAccount, createTransferInstruction } = require('@solana/spl-token');
require('dotenv').config();

const app = express();
app.use(express.json());

const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com');
const USDC_MINT = new PublicKey(process.env.USDC_MINT_ADDRESS || 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'); // Devnet USDC

app.post('/pay', async (req, res) => {
    const { workerAddress, amount } = req.body;
    try {
        console.log(`Processing payment of ${amount} USDC to ${workerAddress}`);
        // Simulated success for now, in production use actual treasury key
        res.json({ status: 'success', signature: 'simulated_signature' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.post('/mint-sbt', async (req, res) => {
    const { workerAddress } = req.body;
    try {
        console.log(`Minting SBT to ${workerAddress}`);
        res.json({ status: 'success', mint: 'simulated_mint_address' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Solana service running on port ${PORT}`));
