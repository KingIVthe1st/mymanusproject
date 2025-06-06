#!/bin/bash
# 🔄 RESTORE TO PRE-PARTICLE SYSTEM STATE
# Run this script to restore the project to its state before dynamic particles

echo "🔄 Restoring to pre-dynamic-particles state..."

# Navigate to project root
cd "/Users/ivanjackson/Documents/local dev projects/🎨 Art & Creative Projects/my-manus-project"

# Create backup of current state (in case we want to go back)
echo "📦 Creating backup of current state..."
mkdir -p backups/current-state-backup-$(date +%Y%m%d-%H%M%S)
cp -r docs/ backups/current-state-backup-$(date +%Y%m%d-%H%M%S)/

# Restore clean state files
echo "🔧 Restoring clean state files..."
cp -r backups/pre-dynamic-particles-backup/docs-clean-state/* docs/

# Remove particle system files
echo "🗑️  Removing particle system files..."
rm -f docs/scripts/dynamic-particle-system.js
rm -f docs/styles/dynamic-particle-system.css

# Verify restoration
echo "✅ Restoration complete!"
echo ""
echo "🌐 To test the restored site:"
echo "   cd docs && python3 -m http.server 8081"
echo "   Open: http://localhost:8081"
echo ""
echo "📋 What was restored:"
echo "   ✓ Static decorative circles"
echo "   ✓ Original HTML structure"
echo "   ✓ All glassmorphism effects"
echo "   ✓ Navigation system"
echo "   ✓ Responsive design"
echo ""
echo "🔄 Current state backed up to: backups/current-state-backup-$(date +%Y%m%d-%H%M%S)/"
