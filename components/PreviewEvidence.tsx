import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Center, HStack, Image, VStack, Text, IconButton, View } from 'native-base';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { configFiles } from '../sdk';
import { RootStackParamList } from '../types/NavigationProps';
type Props = NativeStackScreenProps<RootStackParamList, 'EvidencePreview', 'MyStack'>;

export default function PreviewEvidence({ route, navigation }: Props) {
    const [evidencePreview, setEvidencePreview] = useState()
    const [evidence, setEvidence] = useState<any>()

    useEffect(() => {
        getFileEvidence(route.params.evidenceId)
    }, [])

    async function getFileEvidence(evidenceId: number) {
        const latestFile = await fetch(`https://portfolio.drieam.app/api/v1/evidence/${evidenceId}`, {
            method: 'GET',
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${configFiles.bearerToken}`,
                'X-CSRF-Token': configFiles.XCSRF
            },
        }).catch(ex => console.log(ex))

        if (!latestFile) return

        const latestFileJson = await latestFile.json()
        console.log(latestFileJson.latest_version.files[0].id)
        setEvidence(latestFileJson)

        const preview = await fetch(`https://portfolio.drieam.app/api/v1/evidence-version-files/${latestFileJson.latest_version.files[0].id}/preview-url`, {
            method: 'GET',
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${configFiles.bearerToken}`,
                'X-CSRF-Token': configFiles.XCSRF
            },
        }).catch(ex => console.log(ex))

        if (!preview) return

        const previewRes = await preview.json()
        setEvidencePreview(previewRes.object_url)
    }

    return (
        <>
            <View style={{ flex: 1, marginTop: 50, marginHorizontal: 25 }}>

                <HStack>
                    <IconButton
                        mr={4}
                        onPress={() => {
                            navigation.goBack()
                        }}
                        style={{
                            alignSelf: "center",
                        }}
                        size="sm"
                        borderColor="#797979"
                        variant="outline"
                        _icon={{
                            as: AntDesign,
                            size: "sm",
                            name: "left",
                            color: "#000"
                        }}
                    />

                    <VStack>

                        <Text fontSize={"lg"}>Preivew evidence</Text>
                        {evidence && <HStack mb={5} justifyContent={"space-between"}>
                            <Text>
                                {evidence.name}
                            </Text>
                            <Text>
                                {evidence.created_at.split("T")[0]}
                            </Text>
                        </HStack>}
                    </VStack>
                </HStack>
                {evidencePreview && <Center>
                    <Image source={{
                        uri: evidencePreview
                    }} alt="Alternate Text" resizeMode='contain' size="full" />
                </Center>}
            </View>
        </>
    )
}