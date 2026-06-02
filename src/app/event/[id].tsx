import { useLocalSearchParams, Stack } from "expo-router"
import { View, Text, StyleSheet, Image, Share, Alert, ActivityIndicator, TouchableOpacity, Platform, ScrollView } from "react-native";
import * as Linking from "expo-linking";
import { defaultEventImage } from "@/constants/images";
import ShareButton from "@/components/events/ShareButton";
import AddToCalendarButton from "@/components/events/AddToCalendarButton";
import Colors from '@/constants/colors'
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useEvents } from "@/hooks/useEvents";



const EventDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    const eventId = Array.isArray(id) ? id[0] : id;
    const { events, loading, error } = useEvents();
    const event = events.find((e) => String(e.id) === String(eventId));

    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
    const [geocoding, setGeocoding] = useState(true);

    useEffect(() => {
        if (!event) {
            setGeocoding(false);
            return;
        }

        setGeocoding(true);
        Location.geocodeAsync(event.location).then((results) => {
            if (results.length > 0) {
                setCoords({ latitude: results[0].latitude, longitude: results[0].longitude });
            }
        }).catch(() => {}).finally(() => setGeocoding(false));
    }, [event?.location]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!event) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Event not found.</Text>
            </View>
        );
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    };

    const shareEvent = async () => {
        try {
            await Share.share({
                title: event.name,
                message: `${event.name}\n${formatDate(event.starts_at)}\n${event.location}\n\n${event.description}`,
            });
        } catch (error) {
            Alert.alert("Error", "Unable to share this event.");
        }
    };

    const addEventToCalendar = async () => {
        const start = new Date(event.starts_at);
        const end = event.ends_at ? new Date(event.ends_at) : new Date(start.getTime() + 60 * 60 * 1000);

        const toICSDate = (d: Date) =>
            d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

        const url =
            `https://www.google.com/calendar/render?action=TEMPLATE` +
            `&text=${encodeURIComponent(event.name)}` +
            `&dates=${toICSDate(start)}/${toICSDate(end)}` +
            `&details=${encodeURIComponent(event.description)}` +
            `&location=${encodeURIComponent(event.location)}`;

        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert("Error", "Unable to open calendar.");
        }
    };

    const getDirections = () => {
        const url = coords
            ? Platform.OS === 'ios'
                ? `maps:?daddr=${coords.latitude},${coords.longitude}`
                : `geo:${coords.latitude},${coords.longitude}?q=${coords.latitude},${coords.longitude}`
            : Platform.OS === 'ios'
                ? `maps:?q=${encodeURIComponent(event.location)}`
                : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;
        Linking.openURL(url);
    };

    return (
        <ScrollView style={ styles.container }>
            <Stack.Screen options={{ title: event.name }}/>
            <View style={ styles.imageContainer}>
                <Image source={event.image_url ? { uri: event.image_url } : defaultEventImage} style={styles.image} resizeMode="cover"/>
            </View>

            <View style={ styles.buttonRow }>
                <ShareButton onPress={ shareEvent } text="Share"/>
                <AddToCalendarButton onPress={ addEventToCalendar } text="Add to Calendar"/>
            </View>

            <Text style={ styles.detailsAndLocationTitle }>Details</Text>
            <Text style={ styles.details }>{ event.description }</Text>

            <Text style={styles.detailsAndLocationTitle}>Location</Text>
            <Text>{event.location}</Text>
            <View style={styles.mapCard}>
                {geocoding ? (
                    <ActivityIndicator style={styles.mapPlaceholder} color={Colors.primary} />
                ) : coords ? (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            ...coords,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                    >
                        <Marker coordinate={coords} title={event.location} />
                    </MapView>
                ) : (
                    <TouchableOpacity
                        style={styles.mapPlaceholder}
                        onPress={() => Linking.openURL(`maps:?q=${encodeURIComponent(event.location)}`)}
                    >
                        <Text style={styles.mapFallbackText}>Could not load map. Tap to open in Maps.</Text>
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity onPress={getDirections} style={styles.directionsButton}>
                <Text style={styles.directionsText}>Get Directions</Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: 25,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 100,
        marginVertical: 12,
    },
    detailsAndLocationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 5
    },
    details: {
        marginBottom: 10
    },
    mapCard: {
        marginTop: 8,
        borderRadius: 16,
        overflow: 'hidden',
        height: 150,
    },
    map: {
        flex: 1,
    },
    mapPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.border,
    },
    mapFallbackText: {
        color: Colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: 16,
    },
    directionsButton: {
        marginTop: 6,
        alignSelf: 'flex-end',
    },
    directionsText: {
        color: Colors.primary,
        fontSize: 13,
    },
    errorText: {
        color: Colors.textSecondary,
        textAlign: "center",
    },
})
