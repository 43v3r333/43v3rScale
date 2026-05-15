const express = require('express');
const { Connection, PublicKey, Keypair, Transaction, sendAndConfirmTransaction } = require('@solana/web3.js');
const { Program, AnchorProvider, Wallet } = require('@coral-xyz/anchor');
require('dotenv').config();

const app = express();
app.use(express.json());

const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com');

app.post('/pay', async (req, res) => {
    const { taskId, useAnchor } = req.body;
    try {
        console.log(`Processing payment for task ${taskId} using Anchor: ${useAnchor}`);
        // Simulated Anchor program call
        // In production: const tx = await program.methods.completeTask(amount).accounts({...}).rpc();
        res.json({ status: 'success', signature: 'simulated_anchor_tx_signature' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Solana service running on port ${PORT}`));
