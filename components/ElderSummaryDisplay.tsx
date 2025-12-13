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
      <Text style={styles.cardTitle}>給長輩的重點整理</Text>

      <Section title="醫生說我怎麼了">
        <Text style={styles.text}>
          {summary?.diagnosis?.condition?.trim() ? summary.diagnosis.condition : "醫生今天沒有明講病況。"}
        </Text>
        {!!summary?.diagnosis?.reason?.trim() && (
          <Text style={styles.subText}>可能原因：{summary.diagnosis.reason}</Text>
        )}
      </Section>

      <Section title="最重要不可以（請特別注意）">
        {renderList(summary?.prohibitions, "醫生今天沒有特別交代『不可以』的事情。")}
      </Section>

      <Section title="危險徵兆（出現就要快點就醫）">
        {renderList(summary?.danger_signs, "醫生今天沒有提到需要緊急就醫的徵兆。")}
      </Section>

      <Section title="飲食建議">
        <Text style={styles.subTitle}>建議多吃</Text>
        {renderList(summary?.diet_advice?.good_to_eat, "醫生今天沒有提到要多吃什麼。")}

        <Text style={[styles.subTitle, { marginTop: 8 }]}>避免食用</Text>
        {renderList(summary?.diet_advice?.avoid_eating, "醫生今天沒有提到要避免什麼。")}
      </Section>

      <Section title="回診提醒">
        <Text style={styles.text}>
          {summary?.follow_up?.date_time?.trim()
            ? `${summary.follow_up.date_time}（${summary.follow_up.day_of_week || "未提供星期"}）`
            : "醫生今天沒有交代回診時間。"}
        </Text>
        <Text style={styles.subTitle}>回診前要做的事</Text>
        {renderList(summary?.follow_up?.tasks, "醫生今天沒有交代要先準備什麼。")}
      </Section>

      <Section title="語音廣播摘要（可直接唸給長輩聽）">
        <Text style={styles.text}>
          {summary?.audio_summary?.trim() ? summary.audio_summary : "醫生今天沒有足夠資訊可以整理成語音摘要。"}
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


