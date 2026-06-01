import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// ─── Icons (simple SVG-style via Text or use react-native-vector-icons) ───────
// Replace these with your actual icon library (e.g. lucide-react-native, expo-icons)
const Icon = ({
  name,
  size = 24,
  color = "#fff",
}: {
  name: string;
  size?: number;
  color?: string;
}) => {
  const icons: Record<string, string> = {
    account: "👤",
    trade: "📊",
    markets: "📈",
    rewards: "🎁",
    leaderboard: "🏆",
    analytics: "📉",
    docs: "↗",
    home: "🏠",
    bell: "🔔",
    user: "👤",
    more: "☰",
  };
  return (
    <Text style={{ fontSize: size * 0.7, color }}>{icons[name] ?? "?"}</Text>
  );
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
}

interface GridItem {
  id: string;
  label: string;
  icon: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const BANNER_SLIDES: BannerSlide[] = [
  {
    id: "1",
    title: "Join our Telegram",
    subtitle: "Trade easily with our Telegram bot—right from the chat.",
    cta: "Start on Telegram",
  },
  {
    id: "2",
    title: "New Markets Live",
    subtitle: "Access 500+ markets with real-time data and deep liquidity.",
    cta: "Explore Markets",
  },
  {
    id: "3",
    title: "Earn Rewards",
    subtitle: "Trade to earn points and climb the leaderboard.",
    cta: "Start Earning",
  },
];

const GRID_ITEMS: GridItem[] = [
  { id: "account1", label: "Account", icon: "account" },
  { id: "trade", label: "Trade", icon: "trade" },
  { id: "account2", label: "Account", icon: "account" },
  { id: "markets", label: "Markets", icon: "markets" },
  { id: "rewards", label: "Rewards", icon: "rewards" },
  { id: "leaderboard", label: "Leaderboard", icon: "leaderboard" },
  { id: "analytics", label: "Analytics", icon: "analytics" },
  { id: "docs", label: "Docs", icon: "docs" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const BannerCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef<FlatList>(null);

  const onScroll = (e: any) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / (width - 48));
    setActiveIndex(idx);
  };

  return (
    <View style={styles.bannerWrapper}>
      <FlatList
        ref={flatRef}
        data={BANNER_SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bannerSlide}>
            {/* Left content */}
            <View style={styles.bannerLeft}>
              <Text style={styles.bannerTitle}>{item.title}</Text>
              <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
              <TouchableOpacity style={styles.bannerCta} activeOpacity={0.85}>
                <Text style={styles.bannerCtaText}>{item.cta}</Text>
              </TouchableOpacity>
            </View>
            {/* Right decorative placeholder */}
            <View style={styles.bannerRight}>
              <View style={styles.bannerMockChat}>
                <View style={[styles.mockBubble, styles.mockBubblePurple]}>
                  <Text style={styles.mockBubbleText}>
                    ETH had to go up at one point, right?
                  </Text>
                </View>
                <View style={[styles.mockBubble, styles.mockBubbleDark]}>
                  <View style={styles.mockChart} />
                </View>
              </View>
            </View>
          </View>
        )}
      />
      {/* Dots */}
      <View style={styles.dotsRow}>
        {BANNER_SLIDES.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === activeIndex ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const GridButton = ({
  item,
  onPress,
}: {
  item: GridItem;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={styles.gridItem}
    onPress={onPress}
    activeOpacity={0.75}
  >
    <View style={styles.gridIconWrapper}>
      <Icon name={item.icon} size={28} color="#fff" />
    </View>
    <Text style={styles.gridLabel}>{item.label}</Text>
  </TouchableOpacity>
);

const TeamBanner = () => (
  <View style={styles.teamBanner}>
    <Text style={styles.teamTitle}>
      Create or Join a Team & Dominate the Leaderboard
    </Text>
    <Text style={styles.teamSubtitle}>Trade Together. Win Together.</Text>
    <View style={styles.teamButtons}>
      <TouchableOpacity style={styles.teamBtnOutline} activeOpacity={0.8}>
        <Text style={styles.teamBtnOutlineText}>Create Team</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.teamBtnFilled} activeOpacity={0.8}>
        <Text style={styles.teamBtnFilledText}>Join Team</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

      {/* Header */}
      <View style={styles.header}>
        {/* Logo placeholder — swap with your SVG/Image */}
        <View style={styles.logoWrapper}>
          <Text style={styles.logoText}>🦅</Text>
        </View>
        <Text style={styles.headerTitle}>HOME</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
            <Icon name="user" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
            <Icon name="bell" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <BannerCarousel />

        {/* Quick Access Grid */}
        <View style={styles.grid}>
          {GRID_ITEMS.map((item) => (
            <GridButton key={item.id} item={item} onPress={() => {}} />
          ))}
        </View>

        <TeamBanner />

        {/* Bottom padding for tab bar */}
        <View style={{ height: 16 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const CARD_BG = "#1a1a1a";
const BORDER_RADIUS = 16;
const SLIDE_WIDTH = width - 48; // 24px padding each side

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },

  // ── Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  logoWrapper: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  logoText: {
    fontSize: 28,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Scroll
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 16 },

  // ── Banner Carousel
  bannerWrapper: {
    marginBottom: 24,
  },
  bannerSlide: {
    width: SLIDE_WIDTH,
    backgroundColor: CARD_BG,
    borderRadius: BORDER_RADIUS,
    padding: 20,
    flexDirection: "row",
    overflow: "hidden",
  },
  bannerLeft: {
    flex: 1,
    justifyContent: "space-between",
    paddingRight: 12,
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: "#999",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  bannerCta: {
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignSelf: "flex-start",
  },
  bannerCtaText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 13,
  },
  bannerRight: {
    width: 110,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerMockChat: {
    gap: 8,
    width: "100%",
  },
  mockBubble: {
    borderRadius: 10,
    padding: 8,
  },
  mockBubblePurple: {
    backgroundColor: "#6c47ff",
  },
  mockBubbleDark: {
    backgroundColor: "#111",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  mockBubbleText: {
    color: "#fff",
    fontSize: 9,
  },
  mockChart: {
    width: "80%",
    height: 30,
    borderBottomWidth: 1.5,
    borderBottomColor: "#6c47ff",
    borderStyle: "solid",
    transform: [{ rotate: "-5deg" }],
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 6,
  },
  dot: {
    height: 4,
    borderRadius: 2,
  },
  dotActive: {
    width: 24,
    backgroundColor: "#fff",
  },
  dotInactive: {
    width: 8,
    backgroundColor: "#444",
  },

  // ── Grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  gridItem: {
    width: (SLIDE_WIDTH - 36) / 4, // 4 columns with 3 gaps of 12
    backgroundColor: CARD_BG,
    borderRadius: BORDER_RADIUS,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  gridIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  gridLabel: {
    color: "#ccc",
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
  },

  // ── Team Banner
  teamBanner: {
    backgroundColor: CARD_BG,
    borderRadius: BORDER_RADIUS,
    padding: 20,
    alignItems: "center",
  },
  teamTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  teamSubtitle: {
    color: "#888",
    fontSize: 13,
    marginBottom: 16,
    textAlign: "center",
  },
  teamButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  teamBtnOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: "center",
  },
  teamBtnOutlineText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  teamBtnFilled: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: "center",
  },
  teamBtnFilledText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 13,
  },
});
