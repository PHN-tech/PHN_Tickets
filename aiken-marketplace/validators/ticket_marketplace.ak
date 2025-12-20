use aiken/collection/list
use aiken/crypto.{VerificationKeyHash}
use aiken/option
use cardano/transaction.{OutputReference, Transaction}

pub type Datum {
  event_id: ByteArray,
  seller: VerificationKeyHash,
  price: Int,
  ticket_number: ByteArray,
  event_date: Int,
  status: Int,
}

pub type Redeemer {
  action: Int,
  buyer: Option<VerificationKeyHash>,
  new_price: Option<Int>,
  quantity: Int,
}

validator ticket_marketplace {
  spend(
    datum: Option<Datum>,
    redeemer: Redeemer,
    out_ref: OutputReference,
    self: Transaction,
  ) {
    fail
  }

  else(_) {
    fail
  }
}
