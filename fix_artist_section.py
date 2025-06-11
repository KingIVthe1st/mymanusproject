#!/usr/bin/env python3
import re

# Read the HTML file
with open('docs/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and fix the pattern around line 1383
# Look for the pattern with section divider followed by duplicate "the Artist" text
pattern = r'(</section>\s*<div class="section-divider"></div>\s*)the Artist\s*the Artist\s*(<div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50"></div>)'

replacement = r'\1<!-- About the Artist Section -->\n<section id="about" class="relative py-24 overflow-hidden">\n\2'

# Apply the fix
fixed_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Check if we found and fixed the issue
if fixed_content != content:
    # Write the fixed content back
    with open('docs/index.html', 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    print("Successfully fixed the duplicate 'the Artist' text!")
else:
    print("Pattern not found. Looking for alternative patterns...")
    
    # Try a simpler pattern
    pattern2 = r'the Artist\s*the Artist'
    if pattern2 in content:
        fixed_content = content.replace('the Artist\nthe Artist', '')
        with open('docs/index.html', 'w', encoding='utf-8') as f:
            f.write(fixed_content)
        print("Fixed using simple pattern replacement!")
