import {
  test,
  newMockEvent,
  assert,
  clearStore,
  log,
} from "matchstick-as/assembly/index";
import { Address, ethereum, BigInt } from "@graphprotocol/graph-ts";
import { ProjectCreated as ProjectCreatedEvent } from "../generated/PreCommitManager/PreCommitManager";
import { handleProjectCreated } from "../src/mapping";

const zeroAddress = "0x0000000000000000000000000000000000000000";
const projectCreator = "0x23c7453ec7ab89b098defb751c7301b5f6d8776a";
const usdcMumbai = "0xe6b8a5cf854791412c1f6efc7caf629f5df1c747";
const commiter1Address = "0x34b8362ed6ba98c132defb351c7902b4f5c2946b";
const commiter2Address = "0x45b6453ec7ab89b098defb721c7301b4f6d8986b";

test("create project test", () => {
  let projectId = 1;
  let createProjectEvent_ = createProjectEvent(
    BigInt.fromI32(projectId),
    projectCreator,
    usdcMumbai,
  );
  handleProjectCreated(createProjectEvent_);
  assert.fieldEquals(
    "Project",
    projectId.toString(),
    "receiver",
    projectCreator
  );
  assert.fieldEquals(
    "Project",
    projectId.toString(),
    "asset",
    usdcMumbai
  );
  assert.fieldEquals(
    "Project",
    projectId.toString(),
    "numCommits",
    "0"
  );
  assert.fieldEquals(
    "Project",
    projectId.toString(),
    "amountCommitted",
    "0"
  );
  assert.fieldEquals(
    "Project",
    projectId.toString(),
    "amountRedeemed",
    "0"
  );
  clearStore();
});

export function createProjectEvent(
  projectId: BigInt,
  creator: string,
  projectAcceptedAsset: string
): ProjectCreatedEvent {
  let mockEvent = newMockEvent();
  let emptyParams = [];
  let projectCreatedEvent = new ProjectCreatedEvent(
    Address.fromString(creator),
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    emptyParams
  );

  projectCreatedEvent.parameters = new Array();
  let projectIdParam = new ethereum.EventParam(
    "projectId",
    ethereum.Value.fromSignedBigInt(projectId)
  );
  let assetParam = new ethereum.EventParam(
    "asset",
    ethereum.Value.fromAddress(Address.fromString(projectAcceptedAsset))
  );
  let creatorParam = new ethereum.EventParam(
    "creator",
    ethereum.Value.fromAddress(Address.fromString(creator))
  );

  projectCreatedEvent.parameters.push(projectIdParam);
  projectCreatedEvent.parameters.push(assetParam);
  projectCreatedEvent.parameters.push(creatorParam);
  return projectCreatedEvent;
}
