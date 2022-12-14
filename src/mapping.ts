import { BigInt } from "@graphprotocol/graph-ts"
import {
  CommitCreated,
  CommitWithdrawn,
  ProjectCreated,
  RedeemFailed,
  RedeemSucceeded
} from "../generated/PreCommitManager/PreCommitManager"
import { Project, Commit } from "../generated/schema"
import {
  CommitExpired,
  CommitExpiringWarning
} from "../generated/CheckExpiration/CheckExpiration"

export function handleCommitCreated(event: CommitCreated): void {
  let commit = new Commit(event.params.commitId.toString());
  let project = Project.load(event.params.projectId.toString());
  if (!project) return;
  project.numCommits = project.numCommits.plus(BigInt.fromI32(1));
  project.amountCommitted = project.amountCommitted.plus(event.params.amount);
  project.save();

  commit.project = project.id;
  commit.committer = event.params.commiter.toHex();
  commit.amount = event.params.amount;
  commit.expiry = event.params.expiry;
  commit.status = "ACTIVE";
  commit.redemptionTime = new BigInt(0);
  commit.createdAt = event.block.timestamp;
  commit.save();
}

export function handleProjectCreated(event: ProjectCreated): void {
  let project = new Project(event.params.projectId.toString());
  project.receiver = event.params.creator.toHex();
  project.asset = event.params.asset.toHex();
  project.numCommits = new BigInt(0);
  project.amountCommitted = new BigInt(0);
  project.numRedeemed = new BigInt(0);
  project.amountRedeemed = new BigInt(0);
  project.createdAt = event.block.timestamp;
  project.save();
}

export function handleRedeemFailed(event: RedeemFailed): void {
  let commit = Commit.load(event.params.commitId.toString());
  if (commit === null) return;
  commit.status = "REDEEMED_FAILED";
  commit.save();
}

export function handleRedeemSucceeded(event: RedeemSucceeded): void {
  let commit = Commit.load(event.params.commitId.toString());
  if (commit === null) return;
  commit.status = "REDEEMED";
  commit.redemptionTime = event.block.timestamp;
  commit.save();

  let project = Project.load(event.params.projectId.toString());
  if (!project) return;
  project.amountRedeemed = project.amountRedeemed.plus(event.params.amount);
  project.numRedeemed = project.numRedeemed.plus(BigInt.fromI32(1));
  project.numCommits = project.numCommits.minus(BigInt.fromI32(1));
  project.amountCommitted = project.amountCommitted.minus(commit.amount);
  project.save();
}

export function handleCommitWithdrawn(event: CommitWithdrawn): void {
  let commit = Commit.load(event.params.commitId.toString());
  if (commit === null) return;
  commit.status = "WITHDRAWN";
  commit.save();

  let project = Project.load(commit.project);
  if (!project) return;
  project.numCommits = project.numCommits.minus(BigInt.fromI32(1));
  project.numRedeemed = project.amountCommitted.minus(commit.amount);
  project.save();
}

export function handleCommitExpired(event: CommitExpired): void {
  let commit = Commit.load(event.params.commitId.toString());
  if (commit === null || commit.status == "EXPIRED") return;
  commit.status = "EXPIRED";
  commit.save();
}

export function handleCommitExpiringWarning(event: CommitExpiringWarning): void {
  let commit = Commit.load(event.params.commitId.toString());
  if (commit === null) return;
  commit.status = "EXPIRY_WARNING";
  commit.save();
}