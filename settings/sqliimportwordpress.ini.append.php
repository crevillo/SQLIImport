
# For each attribute you can define to which type
# of attributes can get their contents.
# This way user will see less options to choose and
# you won't have to worry about strange associations.
# if the attribute is not listed here, then all the attrs of
# the selected class will be shown. 
[AttributesDatatypeMapping]
BlogAttributeTitle=ezstring
BlogAttributeDescription=eztext;ezxmltext
BlogPostAttributeTitle=ezstring
BlogPostAttributeDescription=eztext;ezxmltext
BlogPostAttributeTags=ezstring;ezkeyword
BlogPostAttributePublicationDate=ezstring;ezdate;ezdatetime
CommentAttributeSubject=ezstring
CommentAttributeMessage=eztext
CommentAttributeAuthor=ezstring;ezauthor
