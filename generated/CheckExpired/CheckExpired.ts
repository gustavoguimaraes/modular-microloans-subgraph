// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class CommitExpired extends ethereum.Event {
  get params(): CommitExpired__Params {
    return new CommitExpired__Params(this);
  }
}

export class CommitExpired__Params {
  _event: CommitExpired;

  constructor(event: CommitExpired) {
    this._event = event;
  }

  get commitId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class CheckExpired__checkUpkeepResult {
  value0: boolean;
  value1: Bytes;

  constructor(value0: boolean, value1: Bytes) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBoolean(this.value0));
    map.set("value1", ethereum.Value.fromBytes(this.value1));
    return map;
  }
}

export class CheckExpired extends ethereum.SmartContract {
  static bind(address: Address): CheckExpired {
    return new CheckExpired("CheckExpired", address);
  }

  checkUpkeep(param0: Bytes): CheckExpired__checkUpkeepResult {
    let result = super.call("checkUpkeep", "checkUpkeep(bytes):(bool,bytes)", [
      ethereum.Value.fromBytes(param0)
    ]);

    return new CheckExpired__checkUpkeepResult(
      result[0].toBoolean(),
      result[1].toBytes()
    );
  }

  try_checkUpkeep(
    param0: Bytes
  ): ethereum.CallResult<CheckExpired__checkUpkeepResult> {
    let result = super.tryCall(
      "checkUpkeep",
      "checkUpkeep(bytes):(bool,bytes)",
      [ethereum.Value.fromBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new CheckExpired__checkUpkeepResult(
        value[0].toBoolean(),
        value[1].toBytes()
      )
    );
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  preCommitManager(): Address {
    let result = super.call(
      "preCommitManager",
      "preCommitManager():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_preCommitManager(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "preCommitManager",
      "preCommitManager():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get preCommitManager_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class PerformUpkeepCall extends ethereum.Call {
  get inputs(): PerformUpkeepCall__Inputs {
    return new PerformUpkeepCall__Inputs(this);
  }

  get outputs(): PerformUpkeepCall__Outputs {
    return new PerformUpkeepCall__Outputs(this);
  }
}

export class PerformUpkeepCall__Inputs {
  _call: PerformUpkeepCall;

  constructor(call: PerformUpkeepCall) {
    this._call = call;
  }

  get value0(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class PerformUpkeepCall__Outputs {
  _call: PerformUpkeepCall;

  constructor(call: PerformUpkeepCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetPreCommitManagerCall extends ethereum.Call {
  get inputs(): SetPreCommitManagerCall__Inputs {
    return new SetPreCommitManagerCall__Inputs(this);
  }

  get outputs(): SetPreCommitManagerCall__Outputs {
    return new SetPreCommitManagerCall__Outputs(this);
  }
}

export class SetPreCommitManagerCall__Inputs {
  _call: SetPreCommitManagerCall;

  constructor(call: SetPreCommitManagerCall) {
    this._call = call;
  }

  get preCommitManager_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetPreCommitManagerCall__Outputs {
  _call: SetPreCommitManagerCall;

  constructor(call: SetPreCommitManagerCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
