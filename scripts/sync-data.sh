#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cp "$ROOT/nova/mission-control/agents.json" "$ROOT/nova-command-center/public/data/agents.json"
cp "$ROOT/nova/mission-control/gap-radar.md" "$ROOT/nova-command-center/public/data/gap-radar.md"
cp "$ROOT/nova/mission-control/skill-requirements.md" "$ROOT/nova-command-center/public/data/skill-requirements.md"
cp "$ROOT/nova/playbooks/founder_mode.md" "$ROOT/nova-command-center/public/data/founder-mode.md"
echo "synced"
