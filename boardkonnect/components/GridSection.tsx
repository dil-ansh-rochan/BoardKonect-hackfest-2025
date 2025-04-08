import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { Tile } from './Tile';

interface GridItem {
  title: string;
  route: string;
  image: string;
}

interface GridSectionProps {
  title: string;
  items: GridItem[];
}

export function GridSection({ title, items }: GridSectionProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <View style={styles.grid}>
        {items.map((item, index) => (
          <View key={index} style={styles.gridItem}>
            <Tile
              image={item.image}
              title={item.title}
              route={item.route}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  gridItem: {
    width: '33%',
    aspectRatio: 1,
  },
}); 