import React, { useState } from 'react';

    function ProfileCard({ profile, profileImages, galleryImages, onlineStatuses, interests, openChatBubble }) {
      const [currentImageIndex, setCurrentImageIndex] = useState(0);

      const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === 0 ? galleryImages[profile.uid].length - 1 : prevIndex - 1
        );
      };

      const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === galleryImages[profile.uid].length - 1 ? 0 : prevIndex + 1
        );
      };

      const hasGalleryImages = galleryImages[profile.uid] && galleryImages[profile.uid].length > 0;
      const currentImage = hasGalleryImages ? galleryImages[profile.uid][currentImageIndex] : profileImages[profile.uid];

      // Calculate age
      const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };

      const age = profile.birthdate ? calculateAge(profile.birthdate) : null;

      return (
        <div className="profile-result-card">
          <div className="profile-result-image">
            <div className="online-status">
              <span className={`online-status-indicator ${onlineStatuses[profile.uid] ? 'online' : 'offline'}`}></span>
              <span className="online-status-text">{onlineStatuses[profile.uid] ? 'Online' : 'Offline'}</span>
            </div>
            {hasGalleryImages && (
              <>
                <button className="image-slider-button prev" onClick={handlePrevImage}>
                  &lt;
                </button>
                <button className="image-slider-button next" onClick={handleNextImage}>
                  &gt;
                </button>
              </>
            )}
            {currentImage ? (
              <img src={currentImage} alt="Profile" />
            ) : (
              <div className="no-image">No Image</div>
            )}
          </div>
          <div className="profile-result-content">
            <div className="profile-name-with-image">
              {profileImages[profile.uid] && (
                <img
                  src={profileImages[profile.uid]}
                  alt="Profile"
                  className="profile-match-image"
                />
              )}
              <h3>{profile.fullName}</h3>
            </div>
            {age !== null && (
              <div className="profile-age">
                {age} years old
              </div>
            )}
            <div className="profile-result-details">
              <span className="detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {profile.location || 'Unknown'}
              </span>
              <span className="detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h18" />
                  <path d="M3 6h18" />
                  <path d="M3 18h18" />
                </svg>
                {profile.denomination || 'Unknown'}
              </span>
              {/* Age calculation can be added here if birthdate is available */}
            </div>
            <p className="profile-result-bio">
              {profile.aboutMe || 'No bio provided.'}
            </p>
            <div className="profile-result-interests">
              {interests[profile.uid] &&
                interests[profile.uid].slice(0, 5).map((interest, index) => (
                  <span key={index}>{interest}</span>
                ))}
              {interests[profile.uid] && interests[profile.uid].length > 5 && (
                <span>+{interests[profile.uid].length - 5} more</span>
              )}
            </div>
            <div className="profile-actions">
              <button className="button view-profile-btn">View Profile</button>
              <button className="button chat-button" onClick={() => openChatBubble(profile)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                &nbsp;Chat
              </button>
            </div>
          </div>
        </div>
      );
    }

    export default ProfileCard;
