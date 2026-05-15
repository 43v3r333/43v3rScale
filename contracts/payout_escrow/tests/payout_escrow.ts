import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PayoutEscrow } from "../target/types/payout_escrow";

describe("payout_escrow", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.PayoutEscrow as Program<PayoutEscrow>;

  it("Is initialized!", async () => {
    // Test logic here
  });
});
