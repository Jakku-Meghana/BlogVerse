import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from "@/components/ui/badge"
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { FaRegCalendarAlt } from "react-icons/fa"
import usericon from '@/assets/images/user.png'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { RouteBlogDetails } from '@/helpers/RouteName'

const BlogCard = ({ props }) => {
  return (
    <Link to={RouteBlogDetails(props.category.slug, props.slug)} className="h-full">
      <Card className="flex flex-col h-full">
        {/* Blog image */}
        <img
          src={props.featuredImage}
          alt={props.title}
          className="h-44 w-full object-cover rounded-t"
        />

        {/* Compact content section */}
        <CardContent className="flex flex-col justify-between p-3 text-sm gap-1">
          {/* Author section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={props?.author?.avatar || usericon} />
              </Avatar>
              <span className="text-xs">{props?.author?.name || "Unknown Author"}</span>
            </div>
            {props?.author?.role === 'admin' && (
              <Badge variant="outline" className="bg-violet-500 text-white text-[10px] py-0.5 px-1.5">
                Admin
              </Badge>
            )}
          </div>

          {/* Date */}
          <div className="text-muted-foreground text-xs flex items-center gap-1">
            <FaRegCalendarAlt className="text-xs" />
            <span>{moment(props.createdAt).format('DD-MM-YYYY')}</span>
          </div>

          {/* Blog title */}
          <h2 className="text-base font-semibold line-clamp-2 leading-snug">
            {props.title}
          </h2>
        </CardContent>
      </Card>
    </Link>
  )
}

export default BlogCard
