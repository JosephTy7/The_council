import { notFound } from "next/navigation"
import { ProfilePage } from "../../components/ProfilePage"
import membersData from "../../../data/members.json"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function MemberPage({ params }: PageProps) {
  const { id } = await params
  const member = membersData.find((m) => m.id === id)

  if (!member) {
    notFound()
  }

  return <ProfilePage member={member} />
}

export async function generateStaticParams() {
  return membersData.map((member) => ({
    id: member.id,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const member = membersData.find((m) => m.id === id)

  if (!member) {
    return {
      title: "Member Not Found - The Council",
    }
  }

  return {
    title: `${member.name} - ${member.title} | The Council`,
    description: member.bio,
  }
}
