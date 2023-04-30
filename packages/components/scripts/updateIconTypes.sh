JQ_CONVERT_TO_TS_STRING_LITERAL_TYPE="split(\"\n\") | map(split(\" \")) | map(select(length != 0))  | map(\"'\(.[0])'\") | join(\" |\n\")"
JQ="docker run --rm -i imega/jq"

CODEPOINTS_URL="https://raw.githubusercontent.com/google/material-design-icons/master/font"
OUTLINED_ICONS_CODEPOINTS_URL="${CODEPOINTS_URL}/MaterialIconsOutlined-Regular.codepoints"
REGULAR_ICONS_CODEPOINTS_URL="${CODEPOINTS_URL}/MaterialIcons-Regular.codepoints"

OUTLINED_CODEPOINTS=$(curl -s $OUTLINED_ICONS_CODEPOINTS_URL | $JQ --slurp --raw-input --raw-output "$JQ_CONVERT_TO_TS_STRING_LITERAL_TYPE")
REGULAR_CODEPOINTS=$(curl -s $REGULAR_ICONS_CODEPOINTS_URL | $JQ --slurp --raw-input --raw-output "$JQ_CONVERT_TO_TS_STRING_LITERAL_TYPE")

cat << EOF > ./src/components/Icon/generated/OutlinedIconType.ts
export type OutlinedIconType =
$OUTLINED_CODEPOINTS;
EOF

cat << EOF > ./src/components/Icon/generated/RegularIconType.ts
export type RegularIconType =
$REGULAR_CODEPOINTS;
EOF

echo "Done!";