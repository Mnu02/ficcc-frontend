import { StyleSheet, Text, View, Image, Pressable, ImageSourcePropType } from "react-native";
import { Event } from '@/types'
import { Link } from 'expo-router'
import Colors from '@/constants/colors'

const defaultEventImage = require("@/assets/defaultEventImage.png");

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
}

function formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });
}

type EventListProps = {
    event: Event;
}

const EventListItem = ({ event } : EventListProps) => {
    const imageSource: ImageSourcePropType = event.image_url
        ? { uri: event.image_url }
        : defaultEventImage;

    const dateLabel = formatDate(event.starts_at);
    const timeLabel = event.ends_at
        ? `${formatTime(event.starts_at)} - ${formatTime(event.ends_at)}`
        : formatTime(event.starts_at);

    return (
        <Link href={`/events/${event.id}`} asChild>
            <Pressable style={styles.container}>
                <Image
                    source={imageSource}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.info}>
                    <Text style={styles.title}>{event.name}</Text>
                    <Text style={styles.date}>{dateLabel}</Text>
                    <Text style={styles.time}>{timeLabel}</Text>
                    <Text style={styles.location}>{event.location}</Text>
                </View>
            </Pressable>
        </Link>
    );
};

export default EventListItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.card,
        borderRadius: 12,
        overflow: "hidden",
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: '25%',
        aspectRatio: 1
    },
    info: {
        padding: 12,
        flex: 1
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.text,
        marginBottom: 4,
    },
    date: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    time: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 4,
    },
    location: {
        fontSize: 13,
        color: Colors.textMuted,
    },
})