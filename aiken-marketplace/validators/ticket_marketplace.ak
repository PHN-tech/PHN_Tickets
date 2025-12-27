use cardano/transaction.{OutputReference, Transaction}

pub type Datum {
  seller: ByteArray,
  status: Int,
}

pub type Redeemer {
  action: Int,
  buyer: ByteArray,
}

validator ticket_marketplace {
  spend(
    datum: Option<Datum>,
    redeemer: Redeemer,
    out_ref: OutputReference,
    self: Transaction,
  ) {
    expect 2 + 2 == 4
    expect redeemer.action >= 0

    True
  }

  else(_) {
    fail
  }
}
