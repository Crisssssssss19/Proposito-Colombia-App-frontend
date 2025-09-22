import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "../context/ThemeContext";
import ButtonCustom from "../components/ButtonCustom";
import FormContainer from '../components/FormContainer';
import FormField from '../components/FormField';
import CustomDropdown from '../components/CustomDropdown';
import ModalSelector from '../components/ModalSelector';
import TagsList from '../components/TagsList';
import AddButton from '../components/AddButton';

// Datos de ejemplo
const CAREERS = [
    "Ingeniería de Sistemas",
    "Administración de Empresas",
    "Medicina",
    "Derecho",
    "Psicología",
    "Marketing",
    "Contaduría Pública",
    "Arquitectura",
    "Diseño Gráfico",
    "Comunicación Social"
];

const UNIVERSITIES = [
    "Universidad Nacional de Colombia",
    "Universidad Javeriana",
    "Universidad de los Andes",
    "Universidad del Rosario",
    "Universidad Externado de Colombia",
    "Universidad La Salle",
    "Universidad Santo Tomás",
    "Universidad Minuto de Dios"
];

const CITIES = [
    "Bogotá, Colombia",
    "Medellín, Colombia",
    "Cali, Colombia",
    "Barranquilla, Colombia",
    "Cartagena, Colombia",
    "Bucaramanga, Colombia",
    "Pereira, Colombia",
    "Manizales, Colombia"
];

type RootStackParamList = {
    BiographyScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function EducationScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    // Estados
    const [selectedCareer, setSelectedCareer] = useState("");
    const [selectedUniversity, setSelectedUniversity] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [specializations, setSpecializations] = useState<string[]>([]);
    const [newSpecialization, setNewSpecialization] = useState("");

    // Estados de modales
    const [showCareerModal, setShowCareerModal] = useState(false);
    const [showUniversityModal, setShowUniversityModal] = useState(false);
    const [showCityModal, setCityModal] = useState(false);

    // Handlers
    const handleGoBack = () => navigation.goBack();
    const handleContinue = () => navigation.navigate("BiographyScreen");

    const addSpecialization = () => {
        if (newSpecialization.trim() && !specializations.includes(newSpecialization.trim())) {
            setSpecializations([...specializations, newSpecialization.trim()]);
            setNewSpecialization("");
        }
    };

    const removeSpecialization = (index: number) => {
        setSpecializations(specializations.filter((_, i) => i !== index));
    };

    return (
        <FormContainer
            onGoBack={handleGoBack}
            progress={33}
            title="Tu formación y ubicación"
        >
            {/* Carrera Profesional */}
            <FormField
                label="Carrera profesional"
                icon="school-outline"
                required
            >
                <CustomDropdown
                    placeholder="Ingeniería de Sistemas"
                    value={selectedCareer}
                    onPress={() => setShowCareerModal(true)}
                />
            </FormField>

            {/* Universidad */}
            <FormField
                label="Universidad (opcional)"
                icon="library-outline"
            >
                <CustomDropdown
                    placeholder="Universidad Nacional de Colombia"
                    value={selectedUniversity}
                    onPress={() => setShowUniversityModal(true)}
                />
            </FormField>

            {/* Ciudad */}
            <FormField
                label="Ciudad, País"
                icon="location-outline"
                required
            >
                <CustomDropdown
                    placeholder="Bogotá, Colombia"
                    value={selectedCity}
                    onPress={() => setCityModal(true)}
                />
            </FormField>

            {/* Especializaciones */}
            <FormField label="Especializaciones (opcional)">
                <View style={styles.specializationInput}>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                color: theme.colors.text.primary,
                                borderColor: theme.colors.border.DEFAULT,
                                backgroundColor: theme.colors.background.secondary,
                            }
                        ]}
                        placeholder="Desarrollo Web, ML..."
                        placeholderTextColor={theme.colors.text.secondary}
                        value={newSpecialization}
                        onChangeText={setNewSpecialization}
                    />
                    <AddButton
                        text=""
                        onPress={addSpecialization}
                        style={styles.squareButton}
                        iconSize={20}
                    />
                </View>

                <TagsList
                    tags={specializations}
                    onRemove={removeSpecialization}
                />
            </FormField>

            {/* Botón Continuar */}
            <ButtonCustom onPress={handleContinue}>
                Continuar
            </ButtonCustom>

            {/* Modales */}
            <ModalSelector
                visible={showCareerModal}
                onClose={() => setShowCareerModal(false)}
                title="Selecciona tu carrera"
                data={CAREERS}
                selectedValue={selectedCareer}
                onSelect={setSelectedCareer}
            />

            <ModalSelector
                visible={showUniversityModal}
                onClose={() => setShowUniversityModal(false)}
                title="Selecciona tu universidad"
                data={UNIVERSITIES}
                selectedValue={selectedUniversity}
                onSelect={setSelectedUniversity}
            />

            <ModalSelector
                visible={showCityModal}
                onClose={() => setCityModal(false)}
                title="Selecciona tu ciudad"
                data={CITIES}
                selectedValue={selectedCity}
                onSelect={setSelectedCity}
            />
        </FormContainer>
    );
}

const styles = StyleSheet.create({
    specializationInput: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
    },
    squareButton: {
        width: 50,
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 0,
    },
});