'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import learnhouseIcon from 'public/learnhouse_bigicon_1.png'
import { getOrgLogoMediaDirectory } from '@services/media/media'
import { getUriWithOrg } from '@services/config/config'
import { cn } from '@/lib/utils'
import { usePlan } from '@components/Hooks/usePlan'

interface AuthBrandingPanelProps {
  org: any
  welcomeText?: string
}

export default function AuthBrandingPanel({ org, welcomeText }: AuthBrandingPanelProps) {
  const authBranding = org?.config?.config?.customization?.auth_branding || org?.config?.config?.general?.auth_branding || {}
  const {
    welcome_message = '',
    text_color = 'light',
  } = authBranding

  const plan = usePlan()
  const isEnterprise = plan === 'enterprise'
  const displayMessage = welcome_message || welcomeText || ''

  return (
    <div
      className="relative flex flex-col h-full w-full"
      style={{ background: '#ffffff' }}
    >
      <div className="relative z-10 flex flex-col h-full p-10">
        {!isEnterprise && (
          <div className="login-topbar">
            <img
              src="/lrn.svg"
              alt="LearnHouse"
              width={200}
              height={30}
              className={cn(
                "transition-opacity hover:opacity-100",
                text_color === 'light' ? "opacity-100" : "opacity-100"
              )}
            />
          </div>
        )}

        <div className="flex-1 flex items-center justify-center">
          <div className={cn(
            "flex flex-col items-center text-center gap-6",
            text_color === 'light' ? "text-gray-900" : "text-gray-900"
          )}>
            <Link prefetch href={getUriWithOrg(org?.slug, '/')}>
              <div className="w-64 h-64 rounded-2xl ring-1 ring-inset ring-gray-100 shadow-xl hover:scale-105 transition-transform duration-200 flex items-center justify-center overflow-hidden">
                {org?.logo_image ? (
                  <img
                    src={getOrgLogoMediaDirectory(org.org_uuid, org.logo_image)}
                    alt={org.name}
                    className="w-full h-full object-contain p-3"
                  />
                ) : (
                  <Image
                    quality={100}
                    width={256}
                    height={256}
                    src={learnhouseIcon}
                    alt="LearnHouse"
                    className="object-contain"
                  />
                )}
              </div>
            </Link>

            <div className="space-y-1">
              <h1 className="font-bold text-4xl tracking-tight text-gray-900">{org?.name}</h1>
              {displayMessage && (
                <p className="text-lg max-w-sm leading-relaxed font-light text-gray-500">
                  {displayMessage}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="h-10" />
      </div>
    </div>
  )
}