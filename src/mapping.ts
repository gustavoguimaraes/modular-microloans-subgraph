import { BigInt } from "@graphprotocol/graph-ts"
import {
  CommitCreated,
  CommitWithdrawn,
  ProjectCreated,
  RedeemFailed,
  RedeemSucceeded
} from "../generated/PreCommitManager/PreCommitManager"
import { Project, Commit } from "../generated/schema"

enum CommitStatus {
  ACTIVE = "ACTIVE",
  WITHDRAWN = "WITHDRAWN",
  REDEEMED = "REDEEMED",
  REDEEMED_FAILED = "REDEEMED_FAILED",
}

export function handleCommitCreated(event: CommitCreated): void {
  const { commitId, projectId, commiter, amount, expiry } = event.params;
  let commit = new Commit(commitId.toString());
  let project = Project.load(projectId.toString());
  if (!project) return;
  project.numCommits = project.numCommits.plus(new BigInt(1));
  project.amountCommitted = project.amountCommitted.plus(amount);
  project.save();

  commit.project = project.id;
  commit.committer = commiter.toHex();
  commit.amount = amount;
  commit.expiry = expiry;
  commit.status = CommitStatus.ACTIVE;
  commit.redemptionTime = new BigInt(0);
  commit.createdAt = event.block.timestamp;
  commit.save();
}

export function handleProjectCreated(event: ProjectCreated): void {
  const { projectId, creator, asset } = event.params;
  let project = new Project(projectId.toString());
  project.receiver = creator.toHex();
  project.asset = asset.toHex();
  project.numCommits = new BigInt(0);
  project.amountCommitted = new BigInt(0);
  project.numRedeemed = new BigInt(0);
  project.amountRedeemed = new BigInt(0);
  project.createdAt = event.block.timestamp;
  project.save();
}

export function handleRedeemFailed(event: RedeemFailed): void {
  const {commitId} = event.params;
  let commit = Commit.load(commitId.toString());
  if (commit === null) return;
  commit.status = CommitStatus.REDEEMED_FAILED;
  commit.redemptionTime = event.block.timestamp;
  commit.save();
 }

export function handleRedeemSucceeded(event: RedeemSucceeded): void {
  const {commitId, projectId, amount} = event.params;
  let project = Project.load(projectId.toString());
  if (!project) return;
  project.amountRedeemed = project.amountRedeemed.plus(amount);
  project.numRedeemed = project.numRedeemed.plus(new BigInt(1));
  project.save();

  let commit = Commit.load(commitId.toString());
  if (commit === null) return;
  commit.status = CommitStatus.REDEEMED;
  commit.redemptionTime = event.block.timestamp;
  commit.save();
 }

 export function handleCommitWithdrawn(event: CommitWithdrawn): void {
  const {commitId} = event.params;
  let commit = Commit.load(commitId.toString());
  if (commit === null) return;
  commit.status = CommitStatus.WITHDRAWN;
  commit.save();

  let project = Project.load(commit.project);
  if (!project) return;
  project.numCommits = project.numCommits.minus((new BigInt(1)));
  project.numRedeemed = project.amountCommitted.minus(commit.amount);
  project.save();
 }
