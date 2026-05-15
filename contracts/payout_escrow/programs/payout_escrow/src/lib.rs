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

    pub fn complete_task(ctx: Context<CompleteTask>, amount: u64) -> Result<()> {
        let cpi_accounts = Transfer {
            from: ctx.accounts.vault_token_account.to_account_info(),
            to: ctx.accounts.worker_token_account.to_account_info(),
            authority: ctx.accounts.vault_authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();

        // In real app, use PDA seeds for vault_authority
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;
        Ok(())
    }

    pub fn mint_reputation(ctx: Context<MintReputation>, metadata: String) -> Result<()> {
        // Mock minting an SBT
        msg!("Minting SBT with metadata: {}", metadata);
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
pub struct CompleteTask<'info> {
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
pub struct MintReputation<'info> {
    #[account(mut)]
    pub worker: Signer<'info>,
}
