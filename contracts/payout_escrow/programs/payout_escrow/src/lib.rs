use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("43v3rScale11111111111111111111111111111111");

#[program]
pub mod payout_escrow {
    use super::*;

    pub fn initialize_project(ctx: Context<InitializeProject>, amount: u64) -> Result<()> {
        let cpi_accounts = Transfer {
            from: ctx.accounts.client_token_account.to_account_info(),
            to: ctx.accounts.vault_token_account.to_account_info(),
            authority: ctx.accounts.client.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;
        Ok(())
    }

    pub fn escrow_payout(ctx: Context<EscrowPayout>, task_id: u64, amount: u64) -> Result<()> {
        let cpi_accounts = Transfer {
            from: ctx.accounts.vault_token_account.to_account_info(),
            to: ctx.accounts.worker_token_account.to_account_info(),
            authority: ctx.accounts.vault_authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();

        // Signed by backend_authority to release funds
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        msg!("Payout executed for task: {}", task_id);
        Ok(())
    }

    pub fn mint_reputation_sbt(ctx: Context<MintReputationSBT>, worker_metadata: String) -> Result<()> {
        msg!("Minting Reputation SBT for worker with metadata: {}", worker_metadata);
        // Logic for Token-2022 non-transferable mint
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeProject<'info> {
    #[account(mut)]
    pub client: Signer<'info>,
    #[account(mut)]
    pub client_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct EscrowPayout<'info> {
    #[account(signer)]
    pub backend_authority: AccountInfo<'info>,
    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,
    pub vault_authority: AccountInfo<'info>,
    #[account(mut)]
    pub worker_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct MintReputationSBT<'info> {
    #[account(mut)]
    pub worker: Signer<'info>,
}
