import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type NavigationProps = NativeStackScreenProps<RootStackParamList>;
export type RootStackParamList = {
    Home: undefined,
    AddEvidence: undefined;
    FileUploadEvidence: undefined;
    ImageUploadEvidence: undefined;
    VideoUploadEvidence: undefined;
    VoiceUploadEvidence: undefined;
    EvidencePreview: { evidenceId: number };
};