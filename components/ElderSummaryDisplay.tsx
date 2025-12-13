import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type ElderSummary = {
  diagnosis: { condition: string | null; reason: string | null };
  prohibitions: string[];
  danger_signs: string[];
  diet_advice: { good_to_eat: string[]; avoid_eating: string[] };
  follow_up: { date_time: string | null; day_of_week: string | null; tasks: string[] };
  audio_summary: string | null;
};

function renderList(items: string[] | undefined | null, emptyText: string) {
  const list = Array.isArray(items) ? items.filter((x) => typeof x === "string" && x.trim()) : [];
  if (list.length === 0) return <Text style={styles.empty}>{emptyText}</Text>;
  return (
    <View style={styles.list}>
      {list.map((t, idx) => (
        <Text key={`${idx}-${t}`} style={styles.item}>
          • {t}
        </Text>
      ))}
    </View>
  );
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

const ElderSummaryDisplay: React.FC<{ summary: ElderSummary }> = ({ summary }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Key Summary for Seniors</Text>

      <Section title="What the Doctor Said">
        <Text style={styles.text}>
          {summary?.diagnosis?.condition?.trim() ? summary.diagnosis.condition : "The doctor did not specify a condition today."}
        </Text>
        {!!summary?.diagnosis?.reason?.trim() && (
          <Text style={styles.subText}>Possible Cause: {summary.diagnosis.reason}</Text>
        )}
      </Section>

      <Section title="Important Prohibitions (Please Pay Special Attention)">
        {renderList(summary?.prohibitions, "The doctor did not mention any specific prohibitions today.")}
      </Section>

      <Section title="Warning Signs (Seek Medical Attention Immediately)">
        {renderList(summary?.danger_signs, "The doctor did not mention any emergency warning signs today.")}
      </Section>

      <Section title="Dietary Recommendations">
        <Text style={styles.subTitle}>Recommended Foods</Text>
        {renderList(summary?.diet_advice?.good_to_eat, "The doctor did not mention any recommended foods today.")}

        <Text style={[styles.subTitle, { marginTop: 8 }]}>Foods to Avoid</Text>
        {renderList(summary?.diet_advice?.avoid_eating, "The doctor did not mention any foods to avoid today.")}
      </Section>

      <Section title="Follow-up Reminder">
        <Text style={styles.text}>
          {summary?.follow_up?.date_time?.trim()
            ? `${summary.follow_up.date_time} (${summary.follow_up.day_of_week || "Day not provided"})`
            : "The doctor did not specify a follow-up appointment time today."}
        </Text>
        <Text style={styles.subTitle}>Tasks Before Follow-up</Text>
        {renderList(summary?.follow_up?.tasks, "The doctor did not mention any preparation tasks today.")}
      </Section>

      <Section title="Audio Summary (Can be read directly to seniors)">
        <Text style={styles.text}>
          {summary?.audio_summary?.trim() ? summary.audio_summary : "The doctor did not provide enough information for an audio summary today."}
        </Text>
      </Section>
    </View>
  );
};

export default ElderSummaryDisplay;

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
  },
  section: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: "#111827",
  },
  subText: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 21,
    color: "#374151",
  },
  list: {
    gap: 6,
  },
  item: {
    fontSize: 16,
    lineHeight: 22,
    color: "#111827",
  },
  empty: {
    fontSize: 15,
    lineHeight: 21,
    color: "#6b7280",
    fontStyle: "italic",
  },
});


