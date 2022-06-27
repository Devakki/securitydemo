<?php

namespace App\Form;

use App\Entity\Blog;
use Doctrine\DBAL\Types\SmallIntType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\String\Slugger\SluggerInterface;
use Vich\UploaderBundle\Form\Type\VichImageType;

class BlogType extends AbstractType
{
    public function __construct(private SluggerInterface $slugger)
    {
        
    }
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title',TextType::class,[
                'required'=>true,
                'attr'=> ['placeholder'=>'Enter Blog Title'],
                'row_attr'=>['class'=>'col-md-12 form-group']
            ])
            ->add('short_description',TextareaType::class,[
                'required'=>true,
                'attr'=> ['placeholder'=>'Enter Short Description'],
                'row_attr'=>['class'=>'col-md-12 form-group']
            ])
            ->add('long_description',TextareaType::class,[
                'required'=>true,
                'attr'=> ['placeholder'=>'Enter Long Description'],
                'row_attr'=>['class'=>'col-md-12 form-group']
            ])
            ->add('image',FileType::class,[
                'required'=>true,
                'row_attr'=>['class'=>'col-md-12 form-group']
            ])
            ->add('author',TextType::class,[
                'required'=>true,
                'attr'=> ['placeholder'=>'Enter Author Name'],
                'row_attr'=>['class'=>'col-md-12 form-group']
            ])
            ->add('status',ChoiceType::class,[
                'choices'=>[
                    'true' => 0,
                    'false'=>1
                ],
                'required'=>true,
                'attr'=>['class'=>'select2 form-control'],
                'row_attr'=>['class'=>'col-md-12 form-group']
            ])
            ->addEventListener(FormEvents::SUBMIT, function (FormEvent $event) {
                /** @var Blog */
                $blog = $event->getData();
                if (null === $blog->getSlug() && null !== $blog->getTitle()) {
                    $blog->setSlug($this->slugger->slug($blog->getTitle())->lower());
                }
            })
        ;
    }
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Blog::class,
        ]);
    }
}
